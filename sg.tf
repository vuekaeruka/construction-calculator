provider "yandex" {
  token     = "t1.9euelZqNy5SXiovLx82TmpHInM6Nku3rnpWax5GMkcrNypCWnZiezo-Ujcrl8_ctDSM4-e91SgIe_t3z9207IDj573VKAh7-zef1656VmpyXzsbIk5qVyYvNyJObzZKd7_zN5_XrnpWak8-Ymp2SjcuSys3IiYqPicjv_cXrnpWanJfOxsiTmpXJi83Ik5vNkp0.i1Tzs_KzW89wfXBYWTOTs1TRhgGOub1Z5Cy-YtNwP0dvaDHDnZzqVqHKC_CG402-Ws0e5t1cIRp_J8BrxODKBg"
  folder_id = "b1gaqajg3pt2t2gcf7ff"
  zone      = "ru-central1-a"
}

variable "admin_cidr" {
  description = "CIDR блок IP-адресов администратора для доступа по SSH"
  type        = list(string)
  default     = ["/32"]
}

variable "network_id" {
  description = "ID сети, в которой создается ВМ"
  type        = string
  default     = "e9biafb0hvnkd3vnrf1c"
}

resource "yandex_vpc_security_group" "calc_app_sg" {
  name        = "sg-construction-calculator"
  description = "Группа безопасности для ВМ со строительным калькулятором"
  network_id  = var.network_id

  ingress {
    protocol       = "TCP"
    description    = "Web HTTP access"
    v4_cidr_blocks = ["0.0.0.0/0"]
    port           = 80
  }

  ingress {
    protocol       = "TCP"
    description    = "Web HTTPS access"
    v4_cidr_blocks = ["0.0.0.0/0"]
    port           = 443
  }

  ingress {
    protocol       = "TCP"
    description    = "SSH Admin Access"
    v4_cidr_blocks = var.admin_cidr
    port           = 22
  }

  egress {
    protocol       = "UDP"
    description    = "DNS Outbound"
    v4_cidr_blocks = ["0.0.0.0/0"]
    port           = 53
  }

  egress {
    protocol       = "TCP"
    description    = "DNS TCP Outbound"
    v4_cidr_blocks = ["0.0.0.0/0"]
    port           = 53
  }

  egress {
    protocol       = "TCP"
    description    = "HTTP Outbound for Updates/API"
    v4_cidr_blocks = ["0.0.0.0/0"]
    port           = 80
  }

  egress {
    protocol       = "TCP"
    description    = "HTTPS Outbound for Updates/API"
    v4_cidr_blocks = ["0.0.0.0/0"]
    port           = 443
  }

  egress {
    protocol       = "UDP"
    description    = "NTP Time Sync"
    v4_cidr_blocks = ["0.0.0.0/0"]
    port           = 123
  }
}