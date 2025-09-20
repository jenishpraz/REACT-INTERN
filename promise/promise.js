
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runTask() {
  console.log("Loading game assets...");

  await delay(2000);
  console.log("Loading textures...");

  await delay(2000);
  console.log("Loading sounds...");

  await delay(2000);
  console.log("Loading levels...");

  await delay(1000);
  console.log("✅ Game ready to play!");
}

runTask();
