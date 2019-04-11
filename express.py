from menu  import Menu, MenuItem
from bs4 import BeautifulSoup
import urllib3

url = "https://chalmerskonferens.se/lunchmenyer-johanneberg/"

http = urllib3.PoolManager()
response = http.request('get', url)
soup = BeautifulSoup(response.data)

express_menu_path = soup.findAll("div", {"class": "siteorigin-widget-tinymce textwidget"})[5].find_all(['table'])
def get_express():
    #Returns the  menuitem
    return express_menu_path[1].find_all('tr')[1].td.div.string

def get_veg():
    return express_menu_path[2].find_all('tr')[1].td.div.string

def get_express_menu():
    return (MenuItem("Express", get_express), MenuItem("Veg", get_veg))

express_menu = Menu("Express,", get_express_menu)