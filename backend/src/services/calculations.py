from fastapi import HTTPException
import math

from src.utils.unit_of_work import IUnitOfWork

from src.schemas.frame import FrameSchema
from src.schemas.calculations import (CalculationFilter, 
                                      CalculationCreateSchema, 
                                      CalcElementCreateSchema, 
                                      CalcSubElementCreateSchema, 
                                      CalcPositionCreateSchema
                                    )
from src.utils.enums import Element, SubElement

class CalculationService:
    
    @staticmethod
    async def create_calculation_frame(uow: IUnitOfWork, data: FrameSchema):
        # Init var
        init_frame = data.init_frame
        windows = data.windows
        ext_doorways = data.ext_doorways
        int_doorways = data.int_doorways
        floor_slab = data.floor_slab
        ext_wall_cladding = data.ext_wall_cladding
        int_wall_cladding = data.int_wall_cladding

        # Calc sub_func
        def calc_board_volume(sub_element_area: float, sub_element_thickness: float):
            sub_element_board_volume = sub_element_area * (sub_element_thickness/1000) * 0.18 * 1.05
            return sub_element_board_volume
            
        def calc_insulation_volume(sub_element_area: float, sub_element_insulation_thickness: float):
            sub_element_insulation_volume = sub_element_area * (sub_element_insulation_thickness/1000) * 1.05
            return sub_element_insulation_volume
        
        def calc_osb_area(sub_element_area: float, sub_element_type: str):
            if sub_element_type == 'int':
                sub_element_osb_area = sub_element_area * 1.12
            elif sub_element_type in {'ext', 'floor'}:
                sub_element_osb_area = sub_element_area * 2 * 1.12
            else:
                raise ValueError(f"Unknown element_type: {sub_element_type}")
            return sub_element_osb_area
        
        def calc_steam_water_proofing_area(sub_element_area: float):
            sub_element_steam_water_proofing_area = sub_element_area * 1.1
            return sub_element_steam_water_proofing_area

        def calc_wind_protection_area(sub_element_area: float):
            sub_element_wind_protection_area = sub_element_area * 1.1
            return sub_element_wind_protection_area

        def calc_quantity(sub_element_value, material_unit_value):
            sub_element_material_quantity = sub_element_value / material_unit_value
            return math.ceil(sub_element_material_quantity)

        def calc_price(sub_element_material_quantity, material_market_price):
            sub_element_material_price = sub_element_material_quantity * material_market_price
            return sub_element_material_price

        # Internal walls
        int_wall_total_area = init_frame.int_wall_length * init_frame.wall_height * 2   
        total_int_opening_area = sum(
            o.height * o.width * o.quantity
            for o in (int_doorways or [])
        )
        int_wall_net_area = int_wall_total_area - total_int_opening_area
        int_wall_board_volume = calc_board_volume(int_wall_net_area, init_frame.int_wall_thickness)
        int_wall_osb_area = calc_osb_area(int_wall_net_area, 'int')

        # External walls
        ext_wall_total_area = init_frame.ext_wall_perimeter * init_frame.wall_height
        total_ext_opening_area = sum(
            o.height * o.width * o.quantity
            for o in (windows or []) + (ext_doorways or [])
        )
        ext_wall_net_area = ext_wall_total_area - total_ext_opening_area
        ext_wall_board_volume = calc_board_volume(ext_wall_net_area, init_frame.ext_wall_thickness)
        ext_wall_insulation_volume = calc_insulation_volume(ext_wall_net_area, ext_wall_cladding.insulation_thickness)
        ext_wall_osb_area = calc_osb_area(ext_wall_net_area, 'ext')
        ext_wall_steam_water_proofing_area = calc_steam_water_proofing_area(ext_wall_net_area)
        ext_wall_wind_protection_area = calc_wind_protection_area(ext_wall_net_area) 

        # Floor slab
        floor_slab_area = init_frame.floor_slab_area
        floor_slab_board_volume = calc_board_volume(floor_slab_area, floor_slab.thickness)
        floor_slab_insulation_volume = calc_insulation_volume(floor_slab_area, floor_slab.thickness)
        floor_slab_osb_area = calc_osb_area(floor_slab_area, 'floor')
        floor_slab_steam_water_proofing_area = calc_steam_water_proofing_area(floor_slab_area)
        floor_slab_wind_protection_area = calc_wind_protection_area(floor_slab_area) 

        # Helper for create calc position
        async def create_calc_position(
                uow: IUnitOfWork,
                calc_sub_element_id: int,
                volume: float,
                material_id: int
            ):
            if material_id is None:
                return
            material = await uow.materials.get_one_filter_by(id=material_id)
            if not material:
                raise HTTPException(status_code=404, detail='Material with id {material_id} not found')
            quantity = calc_quantity(volume, material.unit_value)
            price = calc_price(quantity, material.market_price)
            await uow.calc_positions.create(
                CalcPositionCreateSchema(
                    calc_sub_element_id=calc_sub_element_id,
                    material_id=material_id,
                    quantity=quantity,
                    price=price
                )
            )
            
        # DB Request/calc quantity and price
        async with uow:

            new_calculation = await uow.calculations.create(
                CalculationCreateSchema(
                    client_id=data.client_id,
                    address=data.address,
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

            for sub_element_name in SubElement:
                new_calc_sub_element = await uow.calc_sub_elements.create(
                    CalcSubElementCreateSchema(
                        calc_element_id=new_calc_element.id,
                        sub_element_name=sub_element_name.value,
                        price=0
                    )
                )

                if sub_element_name == SubElement.INTERNAL_WALL:
                    await create_calc_position(uow, new_calc_sub_element.id, int_wall_board_volume, 1)
                    await create_calc_position(uow, new_calc_sub_element.id, int_wall_osb_area, int_wall_cladding.osb_id)
                elif sub_element_name == SubElement.EXTERNAL_WALL:
                    await create_calc_position(uow, new_calc_sub_element.id, ext_wall_board_volume, 1)
                    await create_calc_position(uow, new_calc_sub_element.id, ext_wall_insulation_volume, ext_wall_cladding.insulation_id)
                    await create_calc_position(uow, new_calc_sub_element.id, ext_wall_osb_area, ext_wall_cladding.osb_id)
                    await create_calc_position(uow, new_calc_sub_element.id, ext_wall_steam_water_proofing_area, ext_wall_cladding.steam_water_proofing_id)
                    await create_calc_position(uow, new_calc_sub_element.id, ext_wall_wind_protection_area, ext_wall_cladding.wind_protection_id)
                elif sub_element_name == SubElement.FLOOR_SLAB:
                    await create_calc_position(uow, new_calc_sub_element.id, floor_slab_board_volume, 1)
                    await create_calc_position(uow, new_calc_sub_element.id, floor_slab_insulation_volume, floor_slab.insulation_id)
                    await create_calc_position(uow, new_calc_sub_element.id, floor_slab_osb_area, floor_slab.osb_id)
                    await create_calc_position(uow, new_calc_sub_element.id, floor_slab_steam_water_proofing_area, floor_slab.steam_water_proofing_id)
                    await create_calc_position(uow, new_calc_sub_element.id, floor_slab_wind_protection_area, floor_slab.wind_protection_id)

                calc_positions = await uow.calc_positions.get_all_filter_by(calc_sub_element_id=new_calc_sub_element.id) or []
                calc_sub_element_total_price = sum(pos.price for pos in calc_positions)
                await uow.calc_sub_elements.update(new_calc_sub_element.id, price=calc_sub_element_total_price)
            
            calc_sub_elements = await uow.calc_sub_elements.get_all_filter_by(calc_element_id=new_calc_element.id) or []
            calc_element_total_price = sum(sub_el.price for sub_el in calc_sub_elements)
            await uow.calc_elements.update(new_calc_element.id, price=calc_element_total_price)

            calc_elements = await uow.calc_elements.get_all_filter_by(calculation_id=new_calculation.id) or []
            calculation_total_price = sum(el.price for el in calc_elements)
            new_upd_calculation = await uow.calculations.update(new_calculation.id, price=calculation_total_price)
            
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
    async def delete_calculation(uow: IUnitOfWork, calculation_id: int):
        async with uow:
            calculation = await uow.calculations.get_one_filter_by(id=calculation_id)
            if not calculation:
                raise HTTPException(status_code=404, detail={'Calculation not found'})
            else:
                calc_elements = await uow.calc_elements.get_all_filter_by(calculation_id=calculation_id)
                for calc_el in calc_elements:
                    calc_sub_elements = await uow.calc_sub_elements.get_all_filter_by(calc_element_id=calc_el.id)
                    for calc_sub_el in calc_sub_elements:
                        calc_positions = await uow.calc_positions.get_all_filter_by(calc_sub_element_id=calc_sub_el.id)
                        for calc_pos in calc_positions:
                            await uow.calc_positions.delete(calc_pos.id)
                        await uow.calc_sub_elements.delete(calc_sub_el.id)
                    await uow.calc_elements.delete(calc_el.id)
                await uow.calculations.delete(calculation_id)
                await uow.commit()
        