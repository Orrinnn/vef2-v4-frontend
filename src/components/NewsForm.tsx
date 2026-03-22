import { useEffect, useState, type FormEvent } from 'react';
import { createNews, fetchAuthors } from '../lib/api';
import type { Author } from '../lib/types';

export function NewsForm() {
  const [title, setTitle] = useState('');
  const [intro, setIntro] = useState('');
  const [content, setContent] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loadingAuthors, setLoadingAuthors] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadAuthors() {
      try {
        const data = await fetchAuthors();
        setAuthors(data);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage('Ekki tókst að sækja höfunda.');
        }
      } finally {
        setLoadingAuthors(false);
      }
    }

    void loadAuthors();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await createNews({
        title,
        intro,
        content,
        authorId: Number(authorId),
      });

      setSuccessMessage('Frétt var búin til.');
      setTitle('');
      setIntro('');
      setContent('');
      setAuthorId('');
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('Villa kom upp við að búa til frétt.');
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="news-form" onSubmit={onSubmit}>
      <div>
        <label htmlFor="title">Titill</label>
        <input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="intro">Útdráttur</label>
        <input
          id="intro"
          value={intro}
          onChange={(e) => setIntro(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="content">Texti</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={8}
        />
      </div>

      <div>
        <label htmlFor="author">Höfundur</label>
        <select
          id="author"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          required
          disabled={loadingAuthors}
        >
          <option value="">Veldu höfund</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" disabled={submitting || loadingAuthors}>
        {submitting ? 'Vista...' : 'Búa til frétt'}
      </button>

      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </form>
  );
}