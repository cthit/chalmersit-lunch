import sys
sys.path.insert(0, "./utils/")
from menu  import Menu, MenuItem
from scraper import Scaper


linsen_scraper = Scaper("https://chalmerskonferens.se/lunchmenyer-johanneberg/")

scraper_path = linsen_scraper.soup.findAll("div", {"class": "siteorigin-widget-tinymce textwidget"})[3].find_all(['table'])
def get_linsen1():
    return scraper_path[1].find_all('tr')[1].td.div.string 

def get_linsen2():
    return scraper_path[1].find_all('tr')[3].td.div.string 

def get_linsen_menu():
        menuItemList = ()
        try:
                menuItemList = (
                        MenuItem("Dagens 1", get_linsen1), 
                        MenuItem("Dagens 2", get_linsen2)
                        )
                return menuItemList
        except:
                return "Error!"

linsen_menu = Menu("linsen,", get_linsen_menu)