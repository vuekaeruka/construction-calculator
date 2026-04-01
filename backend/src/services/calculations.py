from fastapi import HTTPException
import math
from datetime import datetime, timedelta
from typing import Optional

from src.utils.unit_of_work import IUnitOfWork
from src.schemas.frame import FrameSchema
from src.schemas.roof import RoofSchema
from src.schemas.foundation import FoundationSchema
from src.schemas.calculations import (CalculationFilter,
                                      CalculationRequestPOSTSchema,
                                      CalculationRequestPUTSchema,
                                      CalculationCreateSchema, 
                                      CalcElementCreateSchema, 
                                      CalcSubElementCreateSchema, 
                                      CalcPositionCreateSchema,
                                      CalculationSchema
                                    )
from src.utils.enums import Element, SubElement, RoofType, FoundationType, CALC_LIFETIME_DAYS

# Класс для наследования общих формул
class Calc:
    def board_volume(self, sub_element_area: float, element_type: str, sub_element_thickness: Optional[float] = None):
        if element_type == 'roof':
            sub_element_board_volume = sub_element_area * 0.09 * 1.05
        elif element_type == 'frame':
            sub_element_board_volume = sub_element_area * (sub_element_thickness/1000) * 0.18 * 1.05
        elif element_type == 'foundation':
            sub_element_board_volume = sub_element_area * 0.1 * 1.05
        return sub_element_board_volume    

    def osb_area(self, sub_element_area: float, element_type: str):
        if element_type in {'int', 'roof'}:
            sub_element_osb_area = sub_element_area * 1.12
        elif element_type in {'ext', 'floor'}:
            sub_element_osb_area = sub_element_area * 2 * 1.12
        return sub_element_osb_area

    def insulation_volume(self, sub_element_area: float, sub_element_insulation_thickness: float):
        sub_element_insulation_volume = sub_element_area * (sub_element_insulation_thickness/1000) * 1.05
        return sub_element_insulation_volume
    
    def steam_water_proofing_area(self, sub_element_area: float):
        sub_element_steam_water_proofing_area = sub_element_area * 1.1
        return sub_element_steam_water_proofing_area
    
    def wind_protection_area(self, sub_element_area: float):
        sub_element_wind_protection_area = sub_element_area * 1.1
        return sub_element_wind_protection_area
        
    @staticmethod
    def quantity(sub_element_value, material_unit_value):
        print(f'Calculating quantity: sub_element_value={sub_element_value}, material_unit_value={material_unit_value}')
        sub_element_material_quantity = sub_element_value / material_unit_value
        return math.ceil(sub_element_material_quantity)
    
    @staticmethod
    def price(sub_element_material_quantity, material_market_price):
        sub_element_material_price = sub_element_material_quantity * material_market_price
        return sub_element_material_price

class CalcFoundation(Calc):
    def __init__(self, foundation: FoundationSchema):
        self.length = foundation.length
        self.width = foundation.width
        self.height = foundation.height
        self.step_rebar = foundation.step_rebar
        self.rebar_length = foundation.rebar_length
        self.board_length = foundation.board_length
        self.board_width = foundation.board_width

    def concrete_volume(self):
        concrete_volume = self.length * self.width * self.height * 1.05
        return concrete_volume
    
    def rebar_total_length(self):
        rebar_quantity_x = (self.length/self.step_rebar + 1) * 2
        rebar_quantity_y = (self.width/self.step_rebar + 1) * 2
        rebar_total_length = (rebar_quantity_x + rebar_quantity_y) * self.rebar_length * 1.05
        return rebar_total_length
    
    def calculate(self):
        formwork_area = (self.length + self.width) * 2 * self.height * 1.05
        return {FoundationType.MONOLITHIC_PLATE: [
            (self.board_volume(formwork_area, 'foundation'), 1),
            (self.concrete_volume(), 11),
            (self.rebar_total_length(), 12)
        ]}

class CalcRoof(Calc):
    def __init__(self, roof: RoofSchema):
        self.init = roof.init_roof
        self.modification = roof.roof_modification or type("RoofModification", (), {"water_proofing_id": None,
                                                                                    "insulation_id": None,
                                                                                    "osb_id": None,
                                                                                    "insulation_thickness": 0})()

    def calculate_roof_sheet_area(self, roof_area: float, roof_type: RoofType):
        if roof_type == RoofType.DOUBLE_SLOPE:
            roof_sheet_area = roof_area * 1.1
        elif roof_type == RoofType.SINGLE_SLOPE:
            roof_sheet_area = roof_area
        return roof_sheet_area

    def calculate(self):
        roof_type = self.init.roof_type

        if roof_type == RoofType.SINGLE_SLOPE:
            roof_area = self.init.slope_width * self.init.left_slope_length
        elif roof_type == RoofType.DOUBLE_SLOPE:
            roof_area = self.init.slope_width * (self.init.left_slope_length + self.init.right_slope_length)

        if roof_type == RoofType.DOUBLE_SLOPE:
            return [
                (self.board_volume(roof_area, type='roof'), 1),
                (self.calculate_roof_sheet_area(roof_area, roof_type), 10),
                (self.insulation_volume(roof_area, self.modification.insulation_thickness), self.modification.insulation_id),
                (self.osb_area(roof_area, type='roof'), self.modification.osb_id),
                (self.steam_water_proofing_area(roof_area), self.modification.water_proofing_id)
            ]

        if roof_type == RoofType.DOUBLE_SLOPE:
            return {RoofType.DOUBLE_SLOPE: [
                (self.board_volume(roof_area, type='roof'), 1),
                (self.calculate_roof_sheet_area(roof_area, RoofType.DOUBLE_SLOPE), 10),
                (self.insulation_volume(roof_area, self.modification.insulation_thickness), self.modification.insulation_id),
                (self.osb_area(roof_area, type='roof'), self.modification.osb_id),
                (self.steam_water_proofing_area(roof_area), self.modification.water_proofing_id)
                ]
            }
        elif roof_type == RoofType.SINGLE_SLOPE:
            return {RoofType.SINGLE_SLOPE: [
                (self.board_volume(roof_area, type='roof'), 1),
                (self.calculate_roof_sheet_area(roof_area, RoofType.SINGLE_SLOPE), 10),
                (self.insulation_volume(roof_area, self.modification.insulation_thickness), self.modification.insulation_id),
                (self.osb_area(roof_area, type='roof'), self.modification.osb_id),
                (self.steam_water_proofing_area(roof_area), self.modification.water_proofing_id)
                ]
            }

class CalcFrame(Calc):
    def __init__(self, frame: FrameSchema):
        self.init = frame.init_frame
        self.windows = frame.windows or []
        self.ext_doors = frame.ext_doorways or []
        self.int_doors = frame.int_doorways or []
        self.floor = frame.floor_slab or type("FloorSlab", (), {"osb_id": None,
                                                                "steam_water_proofing_id": None,
                                                                "wind_protection_id": None,
                                                                "insulation_id": None,})()
        self.ext = frame.ext_wall_cladding
        self.int = frame.int_wall_cladding or type("IntWallCladding", (), {"osb_id": None})()

    def openings_area(self, openings: list):
        total_opening_area = sum(
            o.height * o.width * o.quantity
            for o in (openings or [])
        )
        return total_opening_area

    def calculate(self):
        int_area = self.init.int_wall_length * self.init.wall_height * 2
        int_area -= self.openings_area(self.int_doors)

        ext_area = self.init.ext_wall_perimeter * self.init.wall_height
        ext_area -= self.openings_area(self.windows) + self.openings_area(self.ext_doors)

        floor_area = self.init.floor_slab_area

        return {
            SubElement.INTERNAL_WALL: [
                (self.board_volume(int_area, 'frame', self.init.int_wall_thickness), 1),
                (self.osb_area(int_area, "int"), self.int.osb_id),
            ],
            SubElement.EXTERNAL_WALL: [
                (self.board_volume(ext_area, 'frame', self.init.ext_wall_thickness), 1),
                (self.insulation_volume(ext_area, self.ext.insulation_thickness), self.ext.insulation_id),
                (self.osb_area(ext_area, "ext"), self.ext.osb_id),
                (self.steam_water_proofing_area(ext_area), self.ext.steam_water_proofing_id),
                (self.wind_protection_area(ext_area), self.ext.wind_protection_id),
            ],
            SubElement.FLOOR_SLAB: [
                (self.board_volume(floor_area, 'frame', self.init.floor_slab_thickness), 1),
                (self.insulation_volume(floor_area, self.init.floor_slab_thickness), self.floor.insulation_id),
                (self.osb_area(floor_area, "floor"), self.floor.osb_id),
                (self.steam_water_proofing_area(floor_area), self.floor.steam_water_proofing_id),
                (self.wind_protection_area(floor_area), self.floor.wind_protection_id),
            ]
        }

class CalculationService:
    
    @staticmethod
    async def __create_calc_element(
        uow: IUnitOfWork,
        calculation_id: int,
        data: CalculationRequestPOSTSchema | CalculationRequestPUTSchema,
        map: dict
    ):
        if data.construction_element.frame:
            element_name = Element.FRAME
        elif data.construction_element.roof:
            element_name = Element.ROOF
        elif data.construction_element.foundation:
            element_name = Element.FOUNDATION

        new_calc_element = await uow.calc_elements.create(
            CalcElementCreateSchema(
                calculation_id=calculation_id,
                element_name=element_name,
                price=0
            )
        )
        element_total_price = 0

        for sub_element_name, items in map.items():
            new_calc_sub_element = await uow.calc_sub_elements.create(
                CalcSubElementCreateSchema(
                    calc_element_id=new_calc_element.id,
                    sub_element_name=sub_element_name.value,
                    price=0
                )
            )
            sub_element_total_price = 0

            async def __create_calc_position(
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
                quantity = Calc.quantity(volume, material.unit_value)
                price = Calc.price(quantity, material.market_price)
                await uow.calc_positions.create(
                    CalcPositionCreateSchema(
                        calc_sub_element_id=calc_sub_element_id,
                        material_id=material_id,
                        quantity=quantity,
                        price=price
                    )
                )
                return price

            for volume, material_id in items:
                sub_element_total_price += await __create_calc_position(uow, new_calc_sub_element.id, volume, material_id)

            await uow.calc_sub_elements.update(new_calc_sub_element.id, price=sub_element_total_price)

            element_total_price += sub_element_total_price

        await uow.calc_elements.update(new_calc_element.id, price=element_total_price)

        return element_total_price
    
    @staticmethod
    def __get_calc_map(data: CalculationRequestPOSTSchema | CalculationRequestPUTSchema):
        if not data.construction_element:
            return None
        elif data.construction_element.frame:
            return CalcFrame(data.construction_element.frame).calculate()
        elif data.construction_element.roof:
            return CalcRoof(data.construction_element.roof).calculate()
        elif data.construction_element.foundation:
            return CalcFoundation(data.construction_element.foundation).calculate()
        else:
            return None

    @staticmethod
    async def create_calculation(uow: IUnitOfWork, data: CalculationRequestPOSTSchema):
        client_id = data.client_id
        address = data.address

        if not any([data.construction_element and data.construction_element.frame, 
                    data.construction_element and data.construction_element.roof, 
                    data.construction_element and data.construction_element.foundation]):
            raise HTTPException(status_code=400, detail='At least one of frame, roof or foundation data must be provided')
        
        calc_map = CalculationService.__get_calc_map(data)

        async with uow:
            new_calculation = await uow.calculations.create(
                CalculationCreateSchema(
                    client_id=client_id,
                    address=address,
                    price=0
                )
            )

            element_total_price = await CalculationService.__create_calc_element(uow, new_calculation.id, data=data, map=calc_map)

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
        data_dict.update({'updated_at': datetime.now()})
        data_dict.update({'expires_at': datetime.now() + timedelta(days=CALC_LIFETIME_DAYS)})

        data_dict.pop('construction_element', None)
        
        calc_map = CalculationService.__get_calc_map(data)

        async with uow:
            calculation = await uow.calculations.get_one_filter_by(id=calculation_id)
            if not calculation:
                raise HTTPException(status_code=404, detail='Calculation not found')
            
            calculation_total_price = calculation.price
            
            if calc_map:
                element_total_price = await CalculationService.__create_calc_element(uow, calculation_id, data=data, map=calc_map)
            
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