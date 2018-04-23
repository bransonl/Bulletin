interface BulletInfo {
  boardId: number;
  parentId: number;
  bulletType: string;
  label: string;
  description: string;
  value: number;
}

interface Bullet extends BulletInfo {
  id: number;
  board: any;
  rootId: number;
  previousId: number;
  children: Bullet;
  updatedAt: Date;
}

export {Bullet, BulletInfo};
