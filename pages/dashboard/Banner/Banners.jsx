import React from 'react'
import { CloseCircleOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
import FileAddOutlined from "@mui/icons-material/NoteAdd";

function Banners() {
  return (
      <div className='mt-5'>
          <Card className='w-[10vw] relative shadow-lg'>
              <FileAddOutlined className='absolute left-0 top-0 text-[--third-color]'/>
              <CloseIcon className=' absolute right-0 top-0 pr-2 font-bold text-3xl text-[--third-color]'/>
             <Image src="/assets/blutooth_speaker.png" width={200} height={200} alt='not found'/>
          </Card>
    </div>
  )
}

export default Banners