import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

test('renders content', () => {
  let component
  const blog = {
    title: 'Hello',
    author: 'Testman',
    likes: 5
  }
  const mockHandler = jest.fn()
  component = render(
    <SimpleBlog blog={blog} toggleLike={mockHandler} /> )
  expect(component.container).toHaveTextContent(
    'Hello'
  )
  const author = component.container.querySelector('.author')
  expect(author).toHaveTextContent('Testman')



  const likes = component.container.querySelector('.likes')
  expect(likes).toHaveTextContent(
    'blog has 5 likes'
  )

  const button = component.container.querySelector('button')
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(1)
  fireEvent.click(button)
  expect(mockHandler.mock.calls.length).toBe(2)
})