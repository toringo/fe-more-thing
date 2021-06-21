function promise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ msg: "ok" });
    }, 2000);
  });
}

async function d() {
  try {
    const res = await promise();
    console.log({ res });
    // promise().then((res) => {
    //   console.log("promise");
    // });
    // .catch((err) => {
    //   console.log("catch", err);
    // })
    // .finally(() => {
    //   console.log("promise-finally");
    // });
  } catch (error) {
    console.log("error", error);
  } finally {
    console.log("finally");
  }
}

d();
