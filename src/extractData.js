export function extractData(querySnapshot) {
  let d = [];
  querySnapshot.forEach(doc => {
    d.push({ ...doc.data(), id: doc.id });
  });
  return d;
}
