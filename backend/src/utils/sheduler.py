from datetime import datetime
from apscheduler.schedulers.asyncio import AsyncIOScheduler

from src.dependencies import UOWdep
from src.utils.enums import CalcStatus

async def expire_calculations(uow: UOWdep):
    async with uow:
        calculations = await uow.calculations.get_all_filter_by(status=CalcStatus.RELEVANT)
        for calc in calculations:
            if calc.expires_at < datetime.now():
                await uow.calculations.update(
                    calc.id,
                    status=CalcStatus.EXPIRED
                )
        await uow.commit()

scheduler = AsyncIOScheduler()

def start_scheduler():
    scheduler.add_job(
        expire_calculations,
        trigger="cron",
        hour=0,
        minute=0,
        args=[UOWdep()]
    )
    scheduler.start()