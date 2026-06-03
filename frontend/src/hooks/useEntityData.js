import { useCallback, useEffect, useMemo, useState } from 'react';
import { normalizeError } from '../utils/formatters.js';

function readByPath(row, path) {
  return String(path.split('.').reduce((acc, key) => acc?.[key], row) ?? '').toLowerCase();
}

export function useEntityData(config) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await config.service.list();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(normalizeError(err));
    } finally {
      setLoading(false);
    }
  }, [config]);

  useEffect(() => { load(); }, [load]);
  useEffect(() => { setPage(1); }, [search]);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return items;
    return items.filter((row) => (config.searchKeys || []).some((key) => readByPath(row, key).includes(term)));
  }, [items, search, config.searchKeys]);

  const paginated = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page]);

  return { items, setItems, filtered, paginated, total: filtered.length, loading, error, search, setSearch, page, setPage, pageSize, reload: load };
}
