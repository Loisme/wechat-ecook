const APP_TAG = 'ecook';
const MENU_COLLECTION = 'menu_collection';
const MENU_HISTORY = 'menu_history';
const SEARCH_HISTORY = 'search_history';


/*
 * 调用API从本地缓存中获取数据
 * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
 * 微信：mpvue === wx, mpvuePlatform === 'wx'
 * 头条：mpvue === tt, mpvuePlatform === 'tt'
 * 百度：mpvue === swan, mpvuePlatform === 'swan'
 * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
 */

/** 新增&&修改本地缓存
 *  @param {string} id 唯一id
 *  @param {string} key 标示
 *  @param {string} value 新增&修改的值
 */
export function saveToLocal(id, key, value) {
  console.log("saveToLocal");
  console.log(value);
  if (mpvuePlatform === 'my') {
    mpvue.setStorageSync({
      key: key,
      data: value
    });
  } else {
    mpvue.setStorageSync(key, value);
  }
}

/** 查询本地缓存
 *  @param {string} id 唯一id
 *  @param {string} key 标示
 *  @param {string} def 如果查询不到显示的值
 */
export function loadFromLocal(id, key, def) {
  let data;
  if (mpvuePlatform === 'my') {
    data = mpvue.getStorageSync({key: key}).data || def;
  } else {
    data = mpvue.getStorageSync(key) || def;
  }
  console.log(data);
  return data;
}

export function addIntoCollectionList(menuItem) {
  let isCollected = hasCollected(menuItem.id);
  if (!isCollected) {
    let collection = getCollectionList();
    collection.unshift(menuItem);
    saveCollectionList(collection);
  }
}

export function deleteFromCollectionList(menuItem) {
  let id = menuItem.id;
  let collectionList = getCollectionList();
  let index = collectionList.findIndex(item => {
    return item.id === id;
  });
  if (index > -1) {
    collectionList.splice(index, 1);
    saveCollectionList(collectionList);
  }
}

export function hasCollected(id) {
  let result = getCollectionList().find(item => {
    return item.id === id;
  });
  return !!result;
}

export function includeOnList(list, id) {
  let result = list.find(item => {
    return item.id === id;
  });
  return !!result;
}

export function addIntoHistoryList(menuItem) {
  let historyList = getHistoryList();
  let isCollected = includeOnList(historyList, menuItem.id);
  if (!isCollected) {
    historyList.unshift(menuItem);
    const limit = 10;
    if (historyList.length > limit) {
      historyList.splice(limit, historyList.length - limit);
    }
    saveHistoryList(historyList);
  }
}

export function addIntoSearchHistoryList(search) {
  let notEmpty = search.trim().length > 0;
  let historyList = getSearchHistoryList();
  let result = historyList.find(str => {
    return str === search;
  });
  if (!result && notEmpty) {
    historyList.unshift(search);
    const limit = 10;
    if (historyList.length > limit) {
      historyList.splice(limit, historyList.length - limit);
    }
    saveSearchHistoryList(historyList);
  }
}

export function deleteSearchHistory() {
  let emptyList = [];
  saveSearchHistoryList(emptyList);
}

export function getSearchHistoryList() {
  return loadFromLocal(APP_TAG, SEARCH_HISTORY, []);
}

function saveSearchHistoryList(history) {
  saveToLocal(APP_TAG, SEARCH_HISTORY, history);
}

export function getHistoryList() {
  return loadFromLocal(APP_TAG, MENU_HISTORY, []);
}

function saveHistoryList(history) {
  saveToLocal(APP_TAG, MENU_HISTORY, history);
}

export function getCollectionList() {
  return loadFromLocal(APP_TAG, MENU_COLLECTION, []);
}

function saveCollectionList(collection) {
  saveToLocal(APP_TAG, MENU_COLLECTION, collection);
}
