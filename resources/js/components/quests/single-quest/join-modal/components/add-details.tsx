import Button from '@/components/shared/buttons/button'
import TextInput from '@/components/shared/inputs/text-input'
import useLocales from '@/hooks/useLocales'

export default function AddDetails({ cameraData, setCameraData, handleJoinQuest, isJoined }: any) {

  const { t } = useLocales()
  return (
    <div className='space-y-3'>
      <TextInput label='Camera Model' placeholder='Enter your camera model' value={cameraData.model} setValue={(val) => setCameraData({ ...cameraData, model: val })} />
      <TextInput label='Lens Model' placeholder='Enter your lens model' value={cameraData.lens} setValue={(val) => setCameraData({ ...cameraData, lens: val })} />
      <TextInput label='Focus' placeholder='Enter your focus' value={cameraData.focus} setValue={(val) => setCameraData({ ...cameraData, focus: val })} />
      <TextInput label='ISO' placeholder='Enter your ISO' value={cameraData.iso} setValue={(val) => setCameraData({ ...cameraData, iso: val })} />
      {
        cameraData.model && cameraData.lens && cameraData.focus && cameraData.iso && <Button text={t(isJoined ? 'singleQuest.banner.addEntryText' : 'singleQuest.banner.joinNowText')}
          onClick={handleJoinQuest}
          className='mt-4 px-6 lg:px-14 text-lg'
        />
      }
    </div>
  )
}
