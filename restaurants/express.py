from menu  import Menu, MenuItem
from scraper import Scaper


express_scraper = Scaper("https://chalmerskonferens.se/lunchmenyer-johanneberg/")

scraper_path = express_scraper.soup.findAll("div", {"class": "siteorigin-widget-tinymce textwidget"})[5].find_all(['table'])
def get_express():
    return scraper_path[1].find_all('tr')[1].td.div.string #returns the current menuitem for the normal express

def get_veg():
    return scraper_path[2].find_all('tr')[1].td.div.string #returns the vegan alternative

def get_express_menu():
    return (
        MenuItem("Express", get_express), 
        MenuItem("Express-Vegan", get_veg)
        )

express_menu = Menu("Express,", get_express_menu)