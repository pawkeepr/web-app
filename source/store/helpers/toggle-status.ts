type Generic = {
  [key: string]: any
  _id: string
  active: boolean
}

export const toggleStatus = (id: string, actives: Array<Generic>, inactives: Array<Generic>) => {
  const indexActivate = actives.findIndex(item => item._id?.toString() === id);
  const indexInactivate = inactives.findIndex(item => item._id?.toString() === id);

  if (indexActivate !== -1) {
    actives[indexActivate].active = !actives[indexActivate].active;
    inactives.push(actives[indexActivate]);
    actives.splice(indexActivate, 1);
  }

  if (indexInactivate !== -1) {
    inactives[indexInactivate].active = !inactives[indexInactivate].active;
    actives.push(inactives[indexInactivate]);
    inactives.splice(indexInactivate, 1);
  }
}