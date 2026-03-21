"""empty message

Revision ID: 41ce2620ecb1
Revises: d596b0e4c363
Create Date: 2026-03-21 02:02:13.604347
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '41ce2620ecb1'
down_revision: Union[str, None] = 'd596b0e4c363'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table('calculation_positions', schema=None) as batch_op:
        # 1. Добавляем колонку nullable
        batch_op.add_column(sa.Column('calculation_subelement_id', sa.Integer(), nullable=True))

    # 2. Обновляем существующие строки (пример: ставим 1 или другой существующий ID)
    op.execute("UPDATE calculation_positions SET calculation_subelement_id = 1 WHERE calculation_subelement_id IS NULL")

    with op.batch_alter_table('calculation_positions', schema=None) as batch_op:
        # 3. Делаем колонку NOT NULL
        batch_op.alter_column('calculation_subelement_id', nullable=False)

        # 4. Создаем FK
        batch_op.create_foreign_key(
            "fk_calc_pos_subelement",
            "calculation_subelements",
            ["calculation_subelement_id"],
            ["id"]
        )

        # 5. Удаляем старую колонку
        batch_op.drop_column('subelement_id')

def downgrade() -> None:
    with op.batch_alter_table('calculation_positions', schema=None) as batch_op:
        # Восстанавливаем старую колонку
        batch_op.add_column(sa.Column('subelement_id', sa.INTEGER(), nullable=False))
        
        # Создаем внешний ключ с именем
        batch_op.create_foreign_key(
            "fk_calc_pos_subelement",
            "calculation_subelements",
            ["subelement_id"],
            ["id"]
        )

        # Удаляем новую колонку
        batch_op.drop_column('calculation_subelement_id')