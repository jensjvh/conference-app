import pytest

from selenium import webdriver
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.common.by import By
from loguru import logger


APP_URL = "http://localhost:5173/conference/"


@pytest.fixture
def driver():
    options = Options()
    options.add_argument("--headless")
    driver = webdriver.Firefox(options=options)
    driver.get(APP_URL)
    yield driver
    driver.quit()


def check_front_page(driver):
    header = driver.find_element(By.TAG_NAME, "h3")
    assert header.text == "2025 IEEE World Congress on SERVICES"


def check_menu_button(driver, button_text: str):
    sidebar_expand = driver.find_element(By.CLASS_NAME, "MuiButtonBase-root")
    sidebar_expand.click()

    driver.implicitly_wait(0.5)

    sidebar = driver.find_element(By.TAG_NAME, "ul")

    sidebar_button = sidebar.find_element(
        By.XPATH, f".//*[contains(text(), '{button_text}')]"
    )
    sidebar_button.click()



def test_frontpage_access(driver):
    check_front_page(driver)


def test_sidebar_works(driver):
    sidebar_expand = driver.find_element(By.CLASS_NAME, "MuiButtonBase-root")
    sidebar_expand.click()

    sidebar_content = driver.find_element(By.TAG_NAME, "ul")

    assert sidebar_content is not None


def test_home_button(driver):
    button_text = "Home"
    check_menu_button(driver, button_text)

    check_front_page(driver)


def test_program_button(driver):
    button_text = "Program"
    check_menu_button(driver, button_text)

    header = driver.find_element(By.TAG_NAME, "h3")

    assert header.text == "SERVICES 2025 Program"


def test_map_button(driver):
    button_text = "Conference Map"
    check_menu_button(driver, button_text)

    header = driver.find_element(By.TAG_NAME, "h1")

    assert header.text == "Conference Map"


def test_venue_button(driver):
    button_text = "Venue Locations"
    check_menu_button(driver, button_text)

    header = driver.find_element(By.TAG_NAME, "h1")

    assert header.text == "Venue Locations"


def test_awards_button(driver):
    button_text = "Awards & Gallery"
    check_menu_button(driver, button_text)

    header = driver.find_element(By.TAG_NAME, "h4")

    assert header.text == "Services 2025 Awards"


def test_walk_tour_button(driver):
    button_text = "Pre-Reception Helsinki Walking Tour"
    check_menu_button(driver, button_text)

    header = driver.find_element(By.TAG_NAME, "h4")

    assert header.text == "Find out more about Helsinki!"


def test_people_flow_button(driver):
    button_text = "People Flow"
    check_menu_button(driver, button_text)

    header = driver.find_element(By.TAG_NAME, "h4")

    assert header.text == "People Flow"


def test_ieee_button(driver):
    button_text = "IEEE History"
    check_menu_button(driver, button_text)

    header = driver.find_element(By.TAG_NAME, "h4")

    assert header.text == "IEEE History"