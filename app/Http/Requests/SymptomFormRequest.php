<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class SymptomFormRequest extends Request
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
            'name' => 'required|min:2|unique:symptoms,name,'.$id,
            'description' => 'required|min:10'
        ];
    }

    public function messages()
    {
        return [
            'name.required' => 'Không được bỏ trống',
            'name.min' => 'Nội dung cần ít nhất 2 kí tự',
            'name.unique' => 'Tên đã được sử dụng, mời chọn tên khác',
            'description.required' => 'Không được bỏ trống',
            'description.min' => 'Nội dung cần ít nhất 10 kí tự'
        ];
    }
}
