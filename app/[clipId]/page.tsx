import Provider from '@/provider';
import ClipEditor from '@/components/clipEditor';

export default function Page({ params }: { params: { clipId: string } }) {
  return (
    <Provider>
      <ClipEditor fileId={params.clipId} />
    </Provider>
  );
}
