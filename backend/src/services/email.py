import base64
from fastapi import HTTPException
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import aiosmtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime
from dotenv import load_dotenv
import os

from src.utils.unit_of_work import IUnitOfWork

load_dotenv()
GMAIL_APP_KEY = os.getenv('GMAIL_APP_KEY')
GMAIL_EMAIL = os.getenv('GMAIL_EMAIL')

def generate_html_table(data):
    colors = {
        "bg": "#0A0A0A",
        "surface": "#1A1A1A",
        "accent": "#EF4444",
        "text_primary": "#FFFFFF",
        "text_secondary": "#A1A1AA",
        "border": "rgba(255, 255, 255, 0.05)",
        "sub_header": "rgba(255, 255, 255, 0.02)"
    }

    styles = {
        "body": f"background-color: {colors['bg']}; color: {colors['text_primary']}; font-family: 'Inter', Arial, sans-serif; padding: 20px;",
        "container": "max-width: 800px; margin: 0 auto;",
        "header": f"background: {colors['surface']}; border: 1px solid {colors['border']}; padding: 24px; border-radius: 8px 8px 0 0;",
        "table": f"width: 100%; border-collapse: collapse; background: {colors['surface']}; border: 1px solid {colors['border']};",
        "th": f"padding: 14px 20px; font-size: 11px; font-weight: 700; color: {colors['text_secondary']}; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid {colors['border']}; text-align: left;",
        "td": f"padding: 12px 20px; font-size: 14px; border-bottom: 1px solid {colors['border']}; color: {colors['text_primary']};",
        "element_row": f"background: rgba(255, 255, 255, 0.05); color: {colors['text_primary']}; font-weight: 700; font-size: 13px; text-transform: uppercase;",
        "subelement_row": f"background: {colors['sub_header']}; color: {colors['text_secondary']}; font-weight: 600; font-size: 12px;",
        "total_card": f"margin-top: 20px; padding: 24px; background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 8px; text-align: right;",
        "accent_text": f"color: {colors['accent']}; font-weight: 800; font-size: 28px;"
    }

    html = f"""
    <div style="{styles['body']}">
        <div style="{styles['container']}">
            
            <div style="{styles['header']}">
                <h1 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">
                    РЕЗУЛЬТАТ РАСЧЕТА
                </h1>
                <p style="margin: 4px 0 0 0; color: {colors['text_secondary']}; font-size: 14px;">
                    {getattr(data, 'address', 'Адрес не указан')}
                </p>
            </div>

            <table style="{styles['table']}">
                <thead>
                    <tr>
                        <th style="{styles['th']}">Наименование</th>
                        <th style="{styles['th']}; text-align: center;">Ед.</th>
                        <th style="{styles['th']}; text-align: right;">Кол-во</th>
                        <th style="{styles['th']}; text-align: right;">Сумма</th>
                    </tr>
                </thead>
                <tbody>
    """

    for element in data.elements:
        html += f"""
            <tr style="{styles['element_row']}">
                <td colspan="3" style="padding: 12px 20px;">{element.element_name}</td>
                <td style="padding: 12px 20px; text-align: right;">{element.price:,.0f} ₽</td>
            </tr>
        """
        
        for sub in element.subelements:
            html += f"""
                <tr style="{styles['subelement_row']}">
                    <td colspan="3" style="padding: 8px 20px; padding-left: 30px;">↳ {sub.sub_element_name}</td>
                    <td style="padding: 8px 20px; text-align: right;">{sub.price:,.0f} ₽</td>
                </tr>
            """
            
            for pos in sub.positions:
                mat = pos.material
                html += f"""
                <tr>
                    <td style="{styles['td']}; padding-left: 45px; color: {colors['text_secondary']};">{mat.name}</td>
                    <td style="{styles['td']}; text-align: center; color: {colors['text_secondary']}; font-size: 12px;">{mat.unit}</td>
                    <td style="{styles['td']}; text-align: right;">{pos.quantity}</td>
                    <td style="{styles['td']}; text-align: right;">{pos.price:,.0f} ₽</td>
                </tr>
                """

    expires = data.expires_at.strftime('%d.%m.%Y') if data.expires_at else "---"
    
    html += f"""
                </tbody>
            </table>

            <div style="{styles['total_card']}">
                <span style="color: {colors['text_primary']}; font-size: 13px; font-weight: 600; text-transform: uppercase;">Итоговая стоимость:</span>
                <div style="{styles['accent_text']}">{data.price:,.0f} ₽</div>
                <p style="margin: 8px 0 0 0; color: {colors['text_secondary']}; font-size: 12px;">
                    Стоимость актуальна до {expires}
                </p>
            </div>
        </div>
    </div>
    """
    return html

class EmailService:
    @staticmethod
    async def send_email(uow: IUnitOfWork, calculation_id):
        async with uow:
            calculation = await uow.calculations.get_one_filter_by(id=calculation_id)
            if not calculation:
                raise HTTPException(status_code=404, detail='Calculation not found')
            
            recipient_email = calculation.client.email
            
            msg = MIMEMultipart()
            msg["From"] = GMAIL_EMAIL
            msg["To"] = recipient_email
            msg["Subject"] = f"Расчет стоимости дома по адресу: {calculation.address}"
            
            body_html = generate_html_table(calculation)
            msg.attach(MIMEText(body_html, "html"))

            try:
                await aiosmtplib.send(
                    msg,
                    hostname="smtp.gmail.com",
                    port=587,
                    username=GMAIL_EMAIL,
                    password=GMAIL_APP_KEY,
                    start_tls=True,
                    timeout=15
                )
                return {"status": "success"}

            except Exception as e:
                print(f"Detailed Error: {type(e).__name__}: {e}")
                raise HTTPException(status_code=500, detail=f"Mail server error: {str(e)}")