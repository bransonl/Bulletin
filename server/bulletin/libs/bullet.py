def build_bullet_tree(bullets):
    tree = []
    nodes = {}
    for bullet in bullets:
        bullet_id = bullet.id
        node = nodes.get(bullet_id)
        if node is None:
            bullet.children = []
            nodes[bullet_id] = bullet
        else:
            bullet.children = node
            nodes[bullet_id] = bullet
        parent_id = bullet.parent_id
        if parent_id is None:
            tree.append(bullet)
        else:
            parent = nodes.get(parent_id)
            if parent is None:
                nodes[parent_id] = [bullet]
            elif isinstance(parent, list):
                nodes[parent_id].append(bullet)
            else:
                nodes[parent_id].children.append(bullet)
    return tree
