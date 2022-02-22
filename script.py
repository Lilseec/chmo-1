import sys
import os
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.support.ui import WebDriverWait


#endpoint = 'https://translate.google.com.ua/?hl=ru&sl=ru&tl=uk&text=' +  sys.argv[1] + '&op=translate'
another = 'https://translate.yandex.com/?lang=ru-uk'


options = webdriver.ChromeOptions()
options.add_experimental_option('excludeSwitches', ['enable-logging'])

options.add_argument("window-size=1280,800")
options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36")
options.add_experimental_option("excludeSwitches", ["enable-automation"]) 
options.add_experimental_option('useAutomationExtension', False)
options.add_argument("--disable-blink-features=AutomationControlled") 
options.add_argument("--log-level=3")

driver = webdriver.Chrome(ChromeDriverManager().install(), chrome_options=options)

driver.get(another)
try:
    myElem = WebDriverWait(driver, 1).until(EC.presence_of_element_located((By.ID, "fakeArea")))
except TimeoutException:
    pass

#elem = driver.find_element_by_class_name('er8xn')

elem = driver.find_element_by_class_name('langs-button_src')
elem.click()
elem = driver.find_element_by_id('langSelect').find_element_by_class_name('switch_size_s')
elem.click()
elem = driver.find_element_by_class_name('langs-button_src')
elem.click()

elem = driver.find_element_by_id('fakeArea')
elem.send_keys(sys.argv[1])
#elem.send_keys('😷 Три області переходять до червоної зони \n  🦠Закарпатська, Луганська та Хмельницька області переходять до «червоної» зони карантину з 11 лютого \n🔹Зараз у «червоній» зоні знаходяться дві області – Рівненська та Івано-Франківська.')
#time.sleep(2)   
#driver.refresh()
#driver.refresh()
try:
    myElem = WebDriverWait(driver, 1).until(EC.presence_of_element_located((By.CLASS_NAME, "VIiyi")))
except TimeoutException:
    pass
#elem = driver.find_element_by_class_name('er8xn')
#elem.send_keys(sys.argv[1])
#elem = driver.find_element_by_class_name('VIiyi')
elem = driver.find_element_by_id('translation')
translate = elem.text



f = open("text.txt", "w", encoding="UTF-8")
f.write(translate)
f.close()
