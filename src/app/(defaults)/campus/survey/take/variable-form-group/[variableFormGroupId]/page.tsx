import IconTask from '@/components/icon/icon-task';

function CampusTakeSurvey() {
  return (
    <div>
      <div className="banner flex h-24 flex-wrap justify-between gap-3">
        <IconTask className="h-10 w-10" />
        <h1 className="text-xl text-white">{'session?.user.name'}</h1>
        <IconTask className="h-10 w-10" />
      </div>
      <div className="panel">
        <div className="mb-3 flex items-center gap-3 text-lg font-bold">
          <h1>Daftar Survey HEDR</h1>
          <span className="badge bg-primary">Kampus</span>
        </div>
        {/* <DataTableCampusFormGroup data={data} /> */}
      </div>
    </div>
  );
}

export default CampusTakeSurvey;
