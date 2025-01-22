import { db } from '@/server/db';
import * as seederData from './seeder';

async function main() {
  await db.roleUser.createMany({ data: seederData.roles });

  await db.campusUser.createMany({ data: seederData.campusUsers });
  await db.campus.createMany({ data: seederData.campuses });
  await db.variable.createMany({ data: seederData.variables });
  await db.formGroup.createMany({ data: seederData.formGroups });
  await db.roleOnFormGroup.createMany({ data: seederData.roleOnFormGroups });
  await db.variableOnFormGroup.createMany({
    data: seederData.variableOnFormGroups,
  });
  await db.question.createMany({ data: seederData.questions });
  await db.option.createMany({ data: seederData.options });
  await db.campusAnswer.createMany({ data: seederData.campusAnswers });
  await db.levelIndex.createMany({ data: seederData.levelIndices });
  await db.levelIndexOnVariables.createMany({
    data: seederData.levelIndexOnVariables,
  });
  await db.campusSurveyLog.createMany({
    data: seederData.campusSurveyLogs,
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
