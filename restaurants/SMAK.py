import sys
sys.path.insert(0, "./utils/")
from menu  import Menu, MenuItem
from scraper import Scaper


smak_scraper = Scaper("https://chalmerskonferens.se/lunchmenyer-johanneberg/")

scraper_path = smak_scraper.soup.findAll("div", {"class": "siteorigin-widget-tinymce textwidget"})[4].find_all(['table'])
def get_daily():
    return scraper_path[1].find_all('tr')[1].td.div.string #returns the daily item

def get_weekly():
    return scraper_path[2].find_all('tr')[1].td.div.string #returns the weekly alternative

def get_smak_menu():
        menuItemList = ()
        try:
                menuItemList = (
                        MenuItem("Daily Smak", get_daily), 
                        MenuItem("Weekly Smak", get_weekly)
                        )
                return menuItemList
        except:
                return "Error!"

smak_menu = Menu("smak,", get_smak_menu)