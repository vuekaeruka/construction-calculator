from enum import StrEnum

class TokenType(StrEnum):
    ACCESS = 'access'
    REFRESH = 'refresh'

class CalcStatus(StrEnum):
    RELEVANT = 'Актуален'
    NOT_RELEVANT = 'Не актуален'
    CONTRACT_SIGNED = 'Заключен договор'

CALC_LIFETIME_DAYS = 10