import React from 'react'

// const BubbleSelect = ({ options, meta, ...input }:any) => {
//   return (
//     <div className="bubble-select">
//       {options?.map((option:any) => (
//         <label key={option?.value} className="bubble-option">
//           <input
//             {...input}
//             type="checkbox"
//             value={option?.value}
//             checked={input?.value.includes(option?.value)}
//             onChange={(e) => {
//               const newValue = e.target.checked
//                 ? [...input?.value, option?.value]
//                 : input?.value?.filter((val:any) => val !== option?.value);
//               input?.onChange(newValue);
//             }}
//           />
//           <span className="bubble-text">{option?.label}</span>
//         </label>
//       ))}
//     </div>
//   );
// };

const BubbleSelect = ({ options, meta, ...input }: any) => {
  const handleChange = (
    option: any,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isClearOption = option?.isClear;

    if (isClearOption) {
      // Якщо обрано опцію з isClear, знімаємо всі інші варіанти
      if (e.target.checked) {
        input?.onChange([option?.value]);
      } else {
        input?.onChange([]);
      }
    } else {
      // Якщо це не isClear, змінюємо вибір за допомогою звичайної логіки
      const newValue = e.target.checked
        ? [...input?.value, option?.value]
        : input?.value?.filter((val: any) => val !== option?.value);

      // Якщо вибрано isClear, знімаємо його
      if (input?.value?.includes('none')) {
        input?.onChange(newValue.filter((val: any) => val !== 'none'));
      } else {
        input?.onChange(newValue);
      }
    }
  };

  return (
    <div className="bubble-select">
      {options?.map((option: any) => (
        <label key={option?.value} className="bubble-option">
          <input
            {...input}
            type="checkbox"
            value={option?.value}
            checked={input?.value.includes(option?.value)}
            onChange={(e) => handleChange(option, e)}
          />
          <span className="bubble-text">{option?.label}</span>
        </label>
      ))}
    </div>
  );
};


export { BubbleSelect }