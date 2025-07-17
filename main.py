from aiogram import Bot, Dispatcher, types
from aiogram.types import ReplyKeyboardMarkup, KeyboardButton
from aiogram.utils import executor

API_TOKEN = '7685806109:AAFqR1MtNB8sYuv13nwPuGnuvOgBqowlmNs'
bot = Bot(token=API_TOKEN)
dp = Dispatcher(bot)

balances = {}

keyboard = ReplyKeyboardMarkup(resize_keyboard=True)
keyboard.add(KeyboardButton("🐔 Кормить курицу"))

@dp.message_handler(commands=['start'])
async def start_game(message: types.Message):
    user_id = message.from_user.id
    balances.setdefault(user_id, 0)
    await message.answer(f"🐣 Добро пожаловать в EGGCoin Farm!\nТвой баланс: {balances[user_id]} EGG", reply_markup=keyboard)

@dp.message_handler(lambda message: message.text == "🐔 Кормить курицу")
async def feed_chicken(message: types.Message):
    user_id = message.from_user.id
    balances[user_id] = balances.get(user_id, 0) + 1
    await message.answer(f"🥚 +1 EGG! Баланс: {balances[user_id]} EGG")

if __name__ == '__main__':
    from aiogram import executor
    executor.start_polling(dp, skip_updates=True)