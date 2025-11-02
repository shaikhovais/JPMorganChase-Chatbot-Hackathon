"""
sanitiser.py is responsible for cleaning data and 
formatting it in a way the chatbot can learn from
"""

def sanitise_txt(file):
    with open (file, "r") as f:
        lines = f.read()
    return(tuple(lines.split("\n")))