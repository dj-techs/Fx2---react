import requests, sys

data = {
  'grant_type': 'password',
  'client_id': '7SrV5jNaUYBJl66DbsrQYnQdWvJG2KWt4xNNt6Cg',
  'client_secret': '3x3KJJwWbvuATyCs7PMpcihW30y8MJeQmtl7MQBMh3j3ozUS2P9t7sYBJWekVcVxNQCx5qkJS89xHVgDPCoD3ZjaDioXjGFSJKM7kHa8cCwm0dMTEnx2oyTg8bu5NQCR',
  'username': sys.argv[1],
  'password': sys.argv[2]
}

r = requests.post('https://x-time-149617.appspot.com/oauth2/token/', data=data)
print r.text