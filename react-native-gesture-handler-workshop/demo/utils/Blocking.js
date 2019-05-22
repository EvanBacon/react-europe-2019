export function block() {
  let start = new Date();
  let end = new Date();
  while (end - start < 3000) {
    end = new Date();
  }
}
export async function blockRandomly() {
  let i = 0;
  while (i < 20) {
    let start = new Date();
    let end = new Date();
    let t = Math.random() * 500;
    while (end - start < t) {
      end = new Date();
    }
    await new Promise(resolve => setTimeout(resolve, 300));
    i++;
  }
}
