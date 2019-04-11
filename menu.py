# menu.py
class MenuItem:
    def __init__(self, title, get_item):
        self.title =  title
        self.item = get_item()

    def string(self):
        return self.title + ": " + self.item
        

class Menu:
    def __init__(self, name, get_items):
        self.name = name
        self.menuItems = get_items()
    
    def string(self):
        out = ""
        for m in self.menuItems:
            out +=  m.string() + "<br>"
        return out