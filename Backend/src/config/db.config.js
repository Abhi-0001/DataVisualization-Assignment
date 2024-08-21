async function connectDB(client) {
  console.clear();
  try {
    await client.connect();
    console.log("database connected succesfully.");
    return true;
  } catch (err) {
    console.log("database connection failed :", err);
    return false;
  }
}

export { connectDB };
