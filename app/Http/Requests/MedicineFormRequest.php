<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class MedicineFormRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $id = $this->id;
        return [
            'name' => 'required|min:3|unique:medicines,name,'.$id,
            'indications' => 'required|min:10',
            'contraindications' => 'required|min:10',
            'unit' => 'required|min:2',
            'dosage_and_administration' => 'required|min:10'
        ];
    }
    public function messages()
    {
        return [
            'name.required' => 'Không được để trống tên',
            'name.min' => 'Tên thuốc cần ít nhất 3 kí tự',
            'name.unique' => 'Tên thuốc đã tồn tại, mời chọn tên khác',
            'indications.required' => 'Không được để trống chỉ định của thuốc',
            'indications.min' => 'Nội dung cần ít nhất 10 kí tự',
            'contraindications.required' => 'Không được để trống chống chỉ định của thuốc',
            'contraindications.min' => 'Nội dung cần ít nhất 10 kí tự',
            'unit.required' => 'Không được để trống đơn vị thuốc',
            'unit.min' => 'Nội dung cần ít nhất 10 kí tự',
            'dosage_and_administration.required' => 'Không được để trống liều lượng và cách dùng',
            'dosage_and_administration.min' => 'Nội dung cần ít nhất 10 kí tự'
        ];
    }
}
