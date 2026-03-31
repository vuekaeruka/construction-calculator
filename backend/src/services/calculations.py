from fastapi import HTTPException
import math
from datetime import datetime, timedelta

from src.utils.unit_of_work import IUnitOfWork
from src.schemas.frame import FrameSchema
from src.schemas.calculations import (CalculationFilter,
                                      CalculationRequestPOSTSchema,
                                      CalculationRequestPUTSchema,
                                      CalculationCreateSchema, 
                                      CalcElementCreateSchema, 
                                      CalcSubElementCreateSchema, 
                                      CalcPositionCreateSchema
                                    )
from src.utils.enums import Element, SubElement, CALC_LIFETIME_DAYS

class CalcFrame:
    def __init__(self, frame: FrameSchema):
        self.init = frame.init_frame
        self.windows = frame.windows or []
        self.ext_doors = frame.ext_doorways or []
        self.int_doors = frame.int_doorways or []
        self.floor = frame.floor_slab or type("FloorSlab", (), {"osb_id": None,
                                                                "steam_water_proofing_id": None,
                                                                "wind_protection_id": None,
                                                                "insulation_id": None})()
        self.ext = frame.ext_wall_cladding
        self.int = frame.int_wall_cladding or type("IntWallCladding", (), {"osb_id": None})()

    def openings_area(self, openings: list):
        total_opening_area = sum(
            o.height * o.width * o.quantity
            for o in (openings or [])
        )
        return total_opening_area

    def board_volume(self, sub_element_area: float, sub_element_thickness: float):
        sub_element_board_volume = sub_element_area * (sub_element_thickness/1000) * 0.18 * 1.05
        return sub_element_board_volume
        
    def insulation_volume(self, sub_element_area: float, sub_element_insulation_thickness: float):
        sub_element_insulation_volume = sub_element_area * (sub_element_insulation_thickness/1000) * 1.05
        return sub_element_insulation_volume
    
    def osb_area(self, sub_element_area: float, sub_element_type: str):
        if sub_element_type == 'int':
            sub_element_osb_area = sub_element_area * 1.12
        elif sub_element_type in {'ext', 'floor'}:
            sub_element_osb_area = sub_element_area * 2 * 1.12
        else:
            raise ValueError(f"Unknown element_type: {sub_element_type}")
        return sub_element_osb_area
    
    def steam_water_proofing_area(self, sub_element_area: float):
        sub_element_steam_water_proofing_area = sub_element_area * 1.1
        return sub_element_steam_water_proofing_area

    def wind_protection_area(self, sub_element_area: float):
        sub_element_wind_protection_area = sub_element_area * 1.1
        return sub_element_wind_protection_area
    
    @staticmethod
    def quantity(sub_element_value, material_unit_value):
        sub_element_material_quantity = sub_element_value / material_unit_value
        return math.ceil(sub_element_material_quantity)
    
    @staticmethod
    def price(sub_element_material_quantity, material_market_price):
        sub_element_material_price = sub_element_material_quantity * material_market_price
        return sub_element_material_price
    
    def calculate(self):
        int_area = self.init.int_wall_length * self.init.wall_height * 2
        int_area -= self.openings_area(self.int_doors)

        ext_area = self.init.ext_wall_perimeter * self.init.wall_height
        ext_area -= self.openings_area(self.windows) + self.openings_area(self.ext_doors)

        floor_area = self.init.floor_slab_area

        return {
            SubElement.INTERNAL_WALL: [
                (self.board_volume(int_area, self.init.int_wall_thickness), 1),
                (self.osb_area(int_area, "int"), self.int.osb_id),
            ],
            SubElement.EXTERNAL_WALL: [
                (self.board_volume(ext_area, self.init.ext_wall_thickness), 1),
                (self.insulation_volume(ext_area, self.ext.insulation_thickness), self.ext.insulation_id),
                (self.osb_area(ext_area, "ext"), self.ext.osb_id),
                (self.steam_water_proofing_area(ext_area), self.ext.steam_water_proofing_id),
                (self.wind_protection_area(ext_area), self.ext.wind_protection_id),
            ],
            SubElement.FLOOR_SLAB: [
                (self.board_volume(floor_area, self.init.floor_slab_thickness), 1),
                (self.insulation_volume(floor_area, self.init.floor_slab_thickness), self.floor.insulation_id),
                (self.osb_area(floor_area, "floor"), self.floor.osb_id),
                (self.steam_water_proofing_area(floor_area), self.floor.steam_water_proofing_id),
                (self.wind_protection_area(floor_area), self.floor.wind_protection_id),
            ]
        }

class CalculationService:
    
    async def create_calc_position(
        uow: IUnitOfWork,
        calc_sub_element_id: int,
        volume: float,
        material_id: int
    ):
        if material_id is None:
            return 0
        material = await uow.materials.get_one_filter_by(id=material_id)
        if not material:
            raise HTTPException(status_code=404, detail='Material with id {material_id} not found')
        quantity = CalcFrame.quantity(volume, material.unit_value)
        price = CalcFrame.price(quantity, material.market_price)
        await uow.calc_positions.create(
            CalcPositionCreateSchema(
                calc_sub_element_id=calc_sub_element_id,
                material_id=material_id,
                quantity=quantity,
                price=price
            )
        )
        return price
    
    @staticmethod
    async def create_calculation(uow: IUnitOfWork, data: CalculationRequestPOSTSchema):
        client_id = data.client_id
        address = data.address

        frame_map = CalcFrame(data.frame).calculate() if data.frame else {}

        async with uow:
            new_calculation = await uow.calculations.create(
                CalculationCreateSchema(
                    client_id=client_id,
                    address=address,
                    price=0
                )
            )

            new_calc_element = await uow.calc_elements.create(
                CalcElementCreateSchema(
                    calculation_id=new_calculation.id,
                    element_name=Element.FRAME,
                    price=0
                )
            )
            element_total_price = 0

            for sub_element_name, items in frame_map.items():
                new_calc_sub_element = await uow.calc_sub_elements.create(
                    CalcSubElementCreateSchema(
                        calc_element_id=new_calc_element.id,
                        sub_element_name=sub_element_name.value,
                        price=0
                    )
                )
                sub_element_total_price = 0

                for volume, material_id in items:
                    sub_element_total_price += await CalculationService.create_calc_position(uow, new_calc_sub_element.id, volume, material_id)

                await uow.calc_sub_elements.update(new_calc_sub_element.id, price=sub_element_total_price)

                element_total_price += sub_element_total_price

            await uow.calc_elements.update(new_calc_element.id, price=element_total_price)

            new_upd_calculation = await uow.calculations.update(new_calculation.id, price=element_total_price)
            
            await uow.commit()
            return new_upd_calculation
        
    @staticmethod
    async def get_calculations_filter_by(uow: IUnitOfWork, filters: CalculationFilter):
        async with uow:
            calculations = await uow.calculations.get_all_filter_by(**filters.clean_dict())
            return calculations or []
        
    @staticmethod
    async def get_calculation_filter_by(uow: IUnitOfWork, calculation_id: int):
        async with uow:
            calculation = await uow.calculations.get_one_filter_by(id=calculation_id)
            if not calculation:
                raise HTTPException(status_code=404, detail='Calculation not found')
            return calculation
        
    @staticmethod
    async def update_calculation(uow: IUnitOfWork, calculation_id: int, data: CalculationRequestPUTSchema):
        data_dict = data.clean_dict()
        data_dict.pop('frame', None)
        data_dict.update({'updated_at': datetime.now()})
        data_dict.update({'expires_at': datetime.now() + timedelta(days=CALC_LIFETIME_DAYS)})

        frame_map = CalcFrame(data.frame).calculate() if data.frame else {}
        async with uow:
            calculation = await uow.calculations.get_one_filter_by(id=calculation_id)
            if not calculation:
                raise HTTPException(status_code=404, detail='Calculation not found')
            
            calculation_total_price = calculation.price
            
            new_calc_element = await uow.calc_elements.create(
                CalcElementCreateSchema(
                    calculation_id=calculation_id,
                    element_name=Element.FRAME,
                    price=0
                )
            )
            element_total_price = 0

            for sub_element_name, items in frame_map.items():
                new_calc_sub_element = await uow.calc_sub_elements.create(
                    CalcSubElementCreateSchema(
                        calc_element_id=new_calc_element.id,
                        sub_element_name=sub_element_name.value,
                        price=0
                    )
                )
                sub_element_total_price = 0

                for volume, material_id in items:
                    sub_element_total_price += await CalculationService.create_calc_position(uow, new_calc_sub_element.id, volume, material_id)

                await uow.calc_sub_elements.update(new_calc_sub_element.id, price=sub_element_total_price)

                element_total_price += sub_element_total_price

            await uow.calc_elements.update(new_calc_element.id, price=element_total_price)
            
            calculation_total_price += element_total_price
            data_dict.update({'price': calculation_total_price})

            upd_calculation = await uow.calculations.update(calculation_id, **data_dict)
            
            await uow.commit()
            return upd_calculation
            
    @staticmethod
    async def delete_calculation(uow: IUnitOfWork, calculation_id: int):
        async with uow:
            calculation = await uow.calculations.get_one_filter_by(id=calculation_id)
            if not calculation:
                raise HTTPException(status_code=404, detail={'Calculation not found'})
            calc_elements = await uow.calc_elements.get_all_filter_by(calculation_id=calculation_id) or []
            for calc_el in calc_elements:
                calc_sub_elements = await uow.calc_sub_elements.get_all_filter_by(calc_element_id=calc_el.id) or []
                for calc_sub_el in calc_sub_elements:
                    calc_positions = await uow.calc_positions.get_all_filter_by(calc_sub_element_id=calc_sub_el.id) or []
                    for calc_pos in calc_positions:
                        await uow.calc_positions.delete(calc_pos.id)
                    await uow.calc_sub_elements.delete(calc_sub_el.id)
                await uow.calc_elements.delete(calc_el.id)
            await uow.calculations.delete(calculation_id)
            await uow.commit()
        