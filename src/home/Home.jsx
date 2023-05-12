import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { history, fetchWrapper } from '_helpers';
import { userActions } from '_store';

export { Home };

function Home() {
    const dispatch = useDispatch();
    const { user: authUser } = useSelector(x => x.auth);
    const [compName, setCompName] = useState('');
    const [empName, setEmpName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const { from } = history.location.state || { from: { pathname: '/' } };

    useEffect(() => {
        dispatch(userActions.getAll());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div class="mt-20 pt-16">
            <h2 class="text-black mt-2">依頼主様情報</h2>
            <div class="my-6">
                <form>
                    <div class="grid gap-4 grid-cols-2">
                        <div class=" mb-6">
                            <div
                                data-popover
                                id="popover-default"
                                role="tooltip"
                                class="absolute z-10 invisible inline-block w-64 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800"
                            >
                                <div class="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                                    <h3 class="font-semibold text-gray-900 dark:text-white">
                                        Popover title
                                    </h3>
                                </div>
                                <div class="px-3 py-2">
                                    <p>
                                        And here's some amazing content. It's very engaging.
                                        Right?
                                    </p>
                                </div>
                                <div data-popper-arrow></div>
                            </div>

                            <label
                                htmlFor="compName"
                                class="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                            >
                                会社名
                            </label>
                            <input
                                placeholder="会社名"
                                data-popover-target="popover-default"
                                id="compName"
                                value={compName}
                                onChange={(e) => setCompName(e.target.value)}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-0 hover:border-primary"
                                required
                            />
                        </div>
                        <div class=" mb-6">
                            <label
                                htmlFor="empName"
                                class="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                            >
                                担当者様 氏名
                            </label>
                            <input
                                placeholder="担当者様 氏名"
                                id="empName"
                                value={empName}
                                onChange={(e) => setEmpName(e.target.value)}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-0 hover:border-primary"
                                required
                            />
                        </div>
                    </div>

                    <div class="grid gap-4 grid-cols-2">
                        <div class=" mb-6">
                            <label
                                htmlFor="email"
                                class="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                            >
                                担当者様 メールアドレス
                            </label>
                            <input
                                placeholder="担当者様 メールアドレス"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-0 hover:border-primary"
                                required
                            />
                        </div>
                        <div class=" mb-6">
                            <label
                                htmlFor="phone"
                                class="block mb-2 text-xs font-medium text-gray-900 dark:text-white"
                            >
                                担当者様 電話番号
                            </label>
                            <input
                                placeholder="担当者様 電話番号"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-0 hover:border-primary"
                                required
                            />
                        </div>
                        <div></div>
                        <div>
                            <button
                                onClick={() => history.navigate(from)}
                                class="flex float-right text-white bg-primary font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                            >
                                Next
                            </button>
                            <div class="clear"></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
}
