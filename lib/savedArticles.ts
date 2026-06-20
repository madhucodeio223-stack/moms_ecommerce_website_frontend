export type SavedArticle = {
  id: string;
  title: string;
  url: string;
  addedAt: string;
};

const KEY = 'moms_saved_articles_v1';

export function getSavedArticles(): SavedArticle[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('getSavedArticles error', e);
    return [];
  }
}

export function saveSavedArticles(list: SavedArticle[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch (e) {
    console.error('saveSavedArticles error', e);
  }
}

export function removeSavedArticle(id: string) {
  try {
    const list = getSavedArticles();
    const filtered = list.filter(a => a.id !== id);
    saveSavedArticles(filtered);
  } catch (e) {
    console.error('removeSavedArticle error', e);
  }
}
