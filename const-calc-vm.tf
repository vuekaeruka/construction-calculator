provider "yandex" {
  cloud_id  = "b1gt69nu9mbedqn18t57"
  folder_id = "b1gaqajg3pt2t2gcf7ff"
  token = "t1.9euelZqNy5SXiovLx82TmpHInM6Nku3rnpWax5GMkcrNypCWnZiezo-Ujcrl8_ctDSM4-e91SgIe_t3z9207IDj573VKAh7-zef1656VmpyXzsbIk5qVyYvNyJObzZKd7_zN5_XrnpWak8-Ymp2SjcuSys3IiYqPicjv_cXrnpWanJfOxsiTmpXJi83Ik5vNkp0.i1Tzs_KzW89wfXBYWTOTs1TRhgGOub1Z5Cy-YtNwP0dvaDHDnZzqVqHKC_CG402-Ws0e5t1cIRp_J8BrxODKBg"
}

resource "yandex_compute_instance" "const-calc-vm" {
  name                      = "const-calc-vm"
  zone                      = "ru-central1-a"
  platform_id               = "standard-v3"
  allow_stopping_for_update = true

  resources {
    cores         = 2
    memory        = 2
    core_fraction = 20
  }

  boot_disk {
    initialize_params {
      image_id = "fd8itsbd5p6iear30rsj"
      size     = 20
      type     = "network-hdd"
    }
  }

  network_interface {
    subnet_id            = "e9biafb0hvnkd3vnrf1c"
    nat                  = true
    security_group_ids   = "enpdf127bn4dso85kmv5"
  }

  metadata = {
    enable-oslogin = "true"
  }
}