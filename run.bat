@echo off
chcp 65001 >nul

echo ⚡ Переход в директорию \backend\
cd backend

echo 📂 Проверка существования виртуального окружения и зависимостей
IF NOT EXIST venv (
    echo ❌ Виртуальное окружение не найдено
    echo 🐍 Создание виртуального окружения...
    python -m venv venv
    echo ✅ Виртуальное окружение создано

    echo 🔧 Обновление pip...
    call venv\Scripts\python -m pip install --upgrade pip -q
    echo ✅ pip обновлен

    echo 📦 Установка зависимостей...
    call venv\Scripts\pip install -r requirements.txt -q
    echo ✅ Все зависимости установлены
) ELSE (
    echo ✅ Виртуальное окружение найдено
    echo 🔍 Проверка и установка недостающих зависимостей...
    call venv\Scripts\pip install -r requirements.txt -q
    echo ✅ Все зависимости установлены
)

echo ⚡ Переход в директорию \src\
cd src

echo 🚀 Запуск сервера...
call ..\venv\Scripts\fastapi dev

pause