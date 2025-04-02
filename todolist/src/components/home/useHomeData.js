import { useEffect, useMemo, useState } from "react";
import { useAgendaGlobalContext } from "../../agendaContext";
import { useGlobalContext } from "../../context";
import { useListGlobalContext } from "./../../listContext";

const useHomeData = () => {
  // const [today] = useState(new Date());
  const { today } = useGlobalContext();
  const formattedDate = useMemo(
    () =>
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
        0
      ),
    [today]
  );

  const { list } = useListGlobalContext();
  const { agendaList } = useAgendaGlobalContext();
  const [completedListItems, setCompletedListItems] = useState(
    []
  ); /*true list 목록들 */
  const [pendingListItems, setPendingListItems] = useState(
    []
  ); /*false list 목록들 */
  const [completedAgendaItems, setCompletedAgendaItems] = useState(
    []
  ); /*true agenda 목록들 */
  const [pendingAgendaItems, setPendingAgendaItems] = useState(
    []
  ); /*false agenda 목록들 */

  /*todo 진행률 퍼센트 */
  const todoProgress = useMemo(
    () =>
      list.length === 0
        ? 0
        : ((completedListItems.length / list.length) * 100).toFixed(0),
    [completedListItems, list]
  );
  /*agenda 진행률 퍼센트 */
  const agendaTotalCount = useMemo(
    () =>
      agendaList
        .filter((item) => item.date.getTime() >= formattedDate.getTime())
        .reduce((acc, item) => acc + item.items.length, 0),
    [agendaList, formattedDate]
  );
  const agendaProgress = useMemo(
    () =>
      agendaTotalCount === 0
        ? 0
        : ((completedAgendaItems.length / agendaTotalCount) * 100).toFixed(0),
    [completedAgendaItems, agendaTotalCount]
  );

  /*list 목록 완료 안된것만 뽑기  */
  const filterListItems = useMemo(
    () => list.filter((item) => !item.isCompleted),
    [list]
  );

  /*agenda 목록 에서 정렬 후 완료 안된것만 뽑기*/
  const filterAgendaItems = useMemo(
    () =>
      agendaList
        .filter((item) => item.date.getTime() >= formattedDate.getTime())
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .flatMap((agenda) =>
          agenda.items
            .filter((filterItem) => !filterItem.isCompleted)
            .map((item) => ({ ...item, date: agenda.date }))
        ),
    [agendaList, formattedDate]
  );
  /*list 완료 미완료 useEffect */
  useEffect(() => {
    let { trueList, falseList } = list.reduce(
      (prev, cur) => {
        if (cur.isCompleted) {
          prev.trueList.push(cur);
        } else {
          prev.falseList.push(cur);
        }
        return prev;
      },
      { trueList: [], falseList: [] }
    );
    setCompletedListItems(trueList);
    setPendingListItems(falseList);
  }, [list]);
  /*agenda 완료 미완료 useEffect */
  useEffect(() => {
    let { trueAgenda, falseAgenda } = agendaList.reduce(
      (prev, cur) => {
        if (cur.date.getTime() >= formattedDate.getTime()) {
          cur.items.forEach((item) => {
            if (item.isCompleted) {
              prev.trueAgenda.push(cur);
            } else {
              prev.falseAgenda.push(cur);
            }
          });
        }
        return prev;
      },
      { trueAgenda: [], falseAgenda: [] }
    );
    setCompletedAgendaItems(trueAgenda);
    setPendingAgendaItems(falseAgenda);
  }, [formattedDate, agendaList]);
  return {
    today,
    completedListItems,
    pendingListItems,
    completedAgendaItems,
    pendingAgendaItems,
    filterListItems,
    filterAgendaItems,
    todoProgress,
    agendaProgress,
  };
};

export default useHomeData;
