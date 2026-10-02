import heapq

GRAPH = {
    "Main Gate": {"Information Center": 120, "Parking": 250},
    "Information Center": {"Main Gate": 120, "Main Hall": 180, "Prasad Area": 150},
    "Parking": {"Main Gate": 250, "Prasad Area": 300},
    "Prasad Area": {"Information Center": 150, "Parking": 300, "Main Hall": 200},
    "Main Hall": {"Information Center": 180, "Prasad Area": 200, "Temple": 100},
    "Temple": {"Main Hall": 100, "Exit": 160},
    "Exit": {"Temple": 160}
}

def shortest_path(source, destination):
    if source not in GRAPH or destination not in GRAPH:
        return None
    dist = {n: float("inf") for n in GRAPH}
    prev = {n: None for n in GRAPH}
    dist[source] = 0
    heap = [(0, source)]
    while heap:
        d, node = heapq.heappop(heap)
        if d != dist[node]:
            continue
        if node == destination:
            break
        for nxt, weight in GRAPH[node].items():
            nd = d + weight
            if nd < dist[nxt]:
                dist[nxt], prev[nxt] = nd, node
                heapq.heappush(heap, (nd, nxt))
    if dist[destination] == float("inf"):
        return None
    path, cur = [], destination
    while cur is not None:
        path.append(cur)
        cur = prev[cur]
    path.reverse()
    return {"source": source, "destination": destination,
            "path": path, "distance_meters": dist[destination],
            "algorithm": "Dijkstra"}
