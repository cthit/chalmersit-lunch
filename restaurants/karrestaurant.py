from menu  import Menu, MenuItem
from scraper import Scaper


kar_scraper = Scaper("https://chalmerskonferens.se/lunchmenyer-johanneberg/")

scraper_path = kar_scraper.soup.findAll("div", {"class": "siteorigin-widget-tinymce textwidget"})[1].find_all(['table'])

def get_veg():
    return scraper_path[1].find_all('tr')[1].td.div.string

def get_fish():
    return scraper_path[2].find_all('tr')[1].td.div.string

def get_express():
    return scraper_path[3].find_all('tr')[1].td.div.string

def get_meat():
    return scraper_path[4].find_all('tr')[1].td.div.string

def get_salad_of_the_week():
    return scraper_path[5].find_all('tr')[1].td.div.string


def get_kar_menu():
    return (
        MenuItem("Classic Vegan", get_veg), 
        MenuItem("Classic Fish", get_fish), 
        MenuItem("Express",  get_express), 
        MenuItem("Classic Meat", get_meat), 
        MenuItem("Veckans Salad", get_salad_of_the_week)
        )

kar_menu = Menu("Kårrestaurangen,", get_kar_menu)

#CLASSIC VEGAN:
#CLASSIC FISK:
#EXPRESS:
#CLASSIC KÖTT:
#VECKANS SALLAD: