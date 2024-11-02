import { useState } from 'react'
import AdminLayout from '../../components/layout/admin-layout'
import RichTextEditor from '../../components/editor/rich-text-editor'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'

export default function EditorTest() {
  const [content, setContent] = useState('')

  return (

      <Card className="border-none shadow-none">
        <CardHeader className="pb-3">
          <CardTitle>New Post</CardTitle>
        </CardHeader>
        <CardContent>
          <RichTextEditor
            content={content}
            onChange={setContent}
          />
        </CardContent>
      </Card>

  )
}
