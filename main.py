import socket
import argparse
from bs4 import BeautifulSoup
from urllib.parse import urlparse

def fetch_url(url):
  # Check if URL is provided
  if not url:
    return
  
  # Check if URL is valid
  try:
    result = urlparse(url)
    if result.scheme and result.netloc:
      url_tmp = result.geturl()
    elif result.path and not result.scheme:
      url_tmp = 'http://' + url
      result = urlparse(url_tmp)
      if not all([result.scheme, result.netloc]):
        print(f"URL is invalid: {url}")
        return
    else:
      print(f"URL is invalid: {url}")
      return
  except ValueError:
    print(f"URL is invalid: {url}")
    return

  port = 80
  recv_size = 4096

  sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  
  try: 
    sock.connect((url, port))
  except socket.gaierror:
    print(f"Unable to connect: {url} is not a known hostname")
    return
  
  request = f"GET / HTTP/1.1\r\nHost: {url}\r\nConnection: close\r\n\r\n"
  sock.send(request.encode())

  response = b""
  while True:
    part = sock.recv(recv_size)
    if part:
      response += part
    else:
      break

  sock.close()

  response = response.decode(errors='ignore')
  soup = BeautifulSoup(response, "html.parser")
  text = soup.get_text()
  print(text)

def fetch_search(search):
  sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
  sock.connect(("www.google.com", 80))
  request = f"GET /search?q={search} HTTP/1.1\r\nHost: www.google.com\r\nConnection: close\r\n\r\n"
  sock.send(request.encode())

  response = b""
  while True:
      part = sock.recv(4096)
      if part:
          response += part
      else:
          break

  sock.close()
  soup = BeautifulSoup(response, "html.parser")
  results = soup.find_all('div', class_='g')

  for result in results[:10]:
    title = result.find('h3').text
    link = result.find('a')['href']
    print(f"{title}\n{link}\n")

def parse_args():
  parser = argparse.ArgumentParser(description="HTTP Client", add_help=False)
  parser.add_argument("-u", "--url", help="make an HTTP request to the specified URL and print the response")
  parser.add_argument("-s", "--search", help="make an HTTP request to search the term using Google search engine and print top 10 results")
  parser.add_argument("-h", "--help", action="help", default=argparse.SUPPRESS,
                      help="show all the options and their description")
  args = parser.parse_args()

  if not any(vars(args).values()):
    parser.print_help()
    exit()

  return args

if __name__ == "__main__":
  args = parse_args()
  fetch_url(args.url)
  fetch_search(args.search)