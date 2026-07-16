import pyfiglet
def good_sentence(sentence: str) -> None:
    """ 
    파라미터 : sentence(str)
    반환: None - 출력만 수행
    """

    py_sentence = pyfiglet.figlet_format(sentence)
    print(py_sentence)

good_sentence("GOOD")

#  ____  ___   ___  ____  
#  / ___|/ _ \ / _ \|  _ \ 
# | |  _| | | | | | | | | |
# | |_| | |_| | |_| | |_| |
#  \____|\___/ \___/|____/ 
                         