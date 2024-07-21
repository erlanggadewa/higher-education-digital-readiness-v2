import { purePrisma } from '@/server/db';
import * as seederData from './seeder';

async function main() {
  await purePrisma.roleUser.createMany({ data: seederData.role });

  await purePrisma.user.createMany({ data: seederData.users });
  await purePrisma.campus.createMany({ data: seederData.campuses });
  await purePrisma.variable.createMany({ data: seederData.variables });
  await purePrisma.formGroup.createMany({ data: seederData.formGroups });
  await purePrisma.roleOnFormGroup.createMany({ data: seederData.roleOnFormGroup });
  await purePrisma.variableOnFormGroup.createMany({
    data: seederData.variableOnFormGroups,
  });
  await purePrisma.question.createMany({ data: seederData.questions });
  await purePrisma.option.createMany({ data: seederData.options });
  await purePrisma.answer.createMany({ data: seederData.answers });
  await purePrisma.levelIndex.createMany({ data: seederData.levelIndices });
  await purePrisma.levelIndexOnVariables.createMany({
    data: seederData.levelIndexOnVariables,
  });
  await purePrisma.campusSurveyLog.createMany({
    data: seederData.campusSurveyLog,
  });
}

main()
  .then(async () => {
    await purePrisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await purePrisma.$disconnect();
    process.exit(1);
  });
