const axios = require("axios");
const JSSoup = require("jssoup").default;

async function getAdidas() {
  console.log("Collecting data from Adidas...");
  const URL =
    "https://www.adidas.com.br/api/plp/content-engine/search?query=calcados&start=";
  const PRODUCT_URL = "https://www.adidas.com.br";
  const PRODUCTS_PER_PAGE = 48;
  const PAGE_NUMBER = 34; // 34
  const START = 0;
  const END = PRODUCTS_PER_PAGE * PAGE_NUMBER;

  var ITEMS = [];

  for (let i = START; i <= END; i += PRODUCTS_PER_PAGE) {
    await axios
      .get(`${URL}${i}`)
      .then((response) => {
        const itemList = response.data.raw.itemList.items;
        itemList.forEach((item) => {
          ITEMS.push({
            productName: item.displayName,
            productRating: item.rating,
            productPrice: undefined,
            productURL: `${PRODUCT_URL}${item.link}`,
            imageURL: item.image.src,
            availableSizes: item.availableSizes,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  console.log(`Colected data from ${ITEMS.length} items.`);
  console.log("Process finished.");
  console.log();
  return ITEMS;
}

async function getArtwalk() {
  console.log("Collecting data from Artwalk...");
  const URL =
    "https://www.artwalk.com.br/buscapagina?fq=specificationFilter_16%3AT%C3%AAnis&O=OrderByReleaseDateDESC&PS=48&sl=92fcab2c-fa76-499b-8403-cbf63f6189bc&cc=1&sm=0&PageNumber=PAGE_NUMBER";
  const START = 0;
  const PAGE_NUMBER = 50; //50

  var ITEMS = [];

  for (let i = START; i <= PAGE_NUMBER; i++) {
    await axios
      .get(URL.replace("PAGE_NUMBER", i))
      .then((response) => {
        var soup = new JSSoup(response.data);
        const itemList = soup.findAll("div", "product-item-container");
        itemList.forEach((item) => {
          var soup = new JSSoup(item);
          ITEMS.push({
            productName: soup.find("h3").text,
            productRating: undefined,
            productPrice: soup.find("span").attrs.content,
            productURL: soup.find("a").attrs.href,
            imageURL: soup.find("img").attrs.src,
            availableSizes: undefined,
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  console.log(`Colected data from ${ITEMS.length} items.`);
  console.log("Process finished.");
  console.log();
  return ITEMS;
}

function getGuadalupe() {
  const URL =
    "https://gdlp.com.br/ajax/layered-navigation/catalog/category/view/id/17/requested-url/calcados/page/PAGE_NUMBER";
}

function getMaze() {
  const URL =
    "https://www.maze.com.br/product/getproductscategory?path=%2Fcategoria%2Ftenis&viewList=g&pageNumber=PAGE_NUMBER&pageSize=PAGE_SIZE&order&brand&category=124681&group&keyWord&initialPrice&finalPrice&variations&idAttribute&idEventList&idCategories&idGroupingType";
}

function getYourId() {
  const URL =
    "https://us1-search.doofinder.com/5/search?hashid=7ae0077b3bca0611664f0094f5cb0547&query_counter=1&page=PAGE_NUMBER&rpp=30&transformer=basic&query=Tenis";
}

async function getAll() {
  const adidas = await getAdidas();
  const artwalk = await getArtwalk();
  const guadalupe = await getGuadalupe();
  const maze = await getMaze();
  const yourid = await getYourId();
  return {
    adidas,
    artwalk,
    guadalupe,
    maze,
    yourid,
  };
}

getAdidas();
getArtwalk();
