from enum import Enum, StrEnum

class CalcStatus(StrEnum):
    RELEVANT = 'Актуален'
    NOT_RELEVANT = 'Не актуален'
    CONTRACT_SIGNED = 'Заключен договор'

CALC_LIFETIME_DAYS = 10