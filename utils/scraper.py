from bs4 import BeautifulSoup
import urllib3

class Scaper:
    def __init__(self, url):
        self.url = url
        http = urllib3.PoolManager()
        response = http.request('get', url)
        self.soup = BeautifulSoup(response.data)