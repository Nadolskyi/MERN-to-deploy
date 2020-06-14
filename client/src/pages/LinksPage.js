import React, { useState, useCallback, useContext, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { Loader } from '../components/Loader';
import { LinksList } from '../components/LinksList';

export const LinksPage = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [links, setLinks] = useState([])
  // const linkId = useParams().id

  const getLinks = useCallback(async () => {
    try {
      const fetched = await request(`/api/link`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fetched)
    } catch (e) { }
  }, [token, request])

  useEffect(() => {
    getLinks()
  }, [getLinks])

  if (loading) {
    return <Loader />
  }

  return (
    <>
      {!loading && <LinksList links={links} />}
    </>
  )
}