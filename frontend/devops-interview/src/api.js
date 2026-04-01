export const getMessage = async () => {
  const res = await fetch("http://localhost:3000/api/message");
  return res.json();
};