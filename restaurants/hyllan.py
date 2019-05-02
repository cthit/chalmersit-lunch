import sys
sys.path.insert(0, "./utils/")
from menu  import Menu, MenuItem
from scraper import Scaper


hyllan_scraper = Scaper("https://chalmerskonferens.se/lunchmenyer-johanneberg/")

scraper_path = hyllan_scraper.soup.findAll("div", {"class": "siteorigin-widget-tinymce textwidget"})[1].find_all(['table'])

def get_precourse1():
    return scraper_path[1].find_all('tr')[1].td.div.string

def get_precourse2():
    return scraper_path[1].find_all('tr')[4].td.div.string

def get_maincourse1():
    return scraper_path[2].find_all('tr')[1].td.div.string

def get_maincourse2():
    return scraper_path[2].find_all('tr')[4].td.div.string

def get_maincourse3():
    return scraper_path[2].find_all('tr')[7].td.div.string

def get_desert():
    return scraper_path[3].find_all('tr')[1].td.div.string

def get_hyllan_menu():
        menuItemList = ()
        try:
                menuItemList = (
                        MenuItem("Förrätt 1", get_precourse1), 
                        MenuItem("Förrätt 2", get_precourse2), 
                        MenuItem("Huvudrätt 1",  get_maincourse1), 
                        MenuItem("Huvudrätt 2", get_maincourse2), 
                        MenuItem("Huvudrätt 3", get_maincourse3),
                        MenuItem("Desert", get_desert)
                        )
                return menuItemList
        except:
                return "Error!"

hyllan_menu = Menu("Hyllan,", get_hyllan_menu)